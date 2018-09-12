package controllers

import javax.inject.Inject
import models.CategoryRepository
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.mvc.{MessagesAbstractController, MessagesControllerComponents}

import scala.concurrent.{ExecutionContext, Future}

class CategoryController @Inject()(categoryRepo: CategoryRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val categoryForm: Form[CreateCategoryForm] = Form {
    mapping(
      "categoryName" -> nonEmptyText
    )(CreateCategoryForm.apply)(CreateCategoryForm.unapply)
  }

  def addCategory = Action.async { implicit request =>

    categoryForm.bindFromRequest.fold(
      _ => {
        Future.successful(
          Ok(Json.obj("result" -> false))
        )
      },
      category => {
        categoryRepo.create(category.name).map { _ =>
          Ok(Json.obj("result" -> true))
        }
      }
    )
  }

  def getCategories = Action.async { implicit request =>
    categoryRepo.list().map { category =>
      Ok(Json.toJson(category))
    }
  }

}

case class CreateCategoryForm(name: String)
