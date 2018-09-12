package controllers

import javax.inject.Inject
import models.ReviewRepository
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.mvc.{MessagesAbstractController, MessagesControllerComponents}

import scala.concurrent.{ExecutionContext, Future}

class ReviewController @Inject()(reviewRepository: ReviewRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val headers = (
    "Access-Control-Allow-Origin" -> "*",
    "Access-Control-Allow-Methods" -> "GET, POST, OPTIONS, DELETE, PUT",
    "Access-Control-Allow-Headers" -> "Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods"
  )

  val reviewForm: Form[CreateReviewForm] = Form {
    mapping(
      "productId" -> nonEmptyText,
      "reviewText" -> nonEmptyText
    )(CreateReviewForm.apply)(CreateReviewForm.unapply)
  }

  def addReview = Action.async { implicit request =>
    reviewForm.bindFromRequest.fold(
      _ => {
        Future.successful(
          Ok(Json.obj("result" -> false)).withHeaders(headers._1, headers._2, headers._3)
        )
      },
      review => {
        reviewRepository.create(review.productId.toLong, review.reviewText).map { _ =>
          Ok(Json.obj("result" -> true)).withHeaders(headers._1, headers._2, headers._3)
        }
      }
    )
  }

  def getReview(productId: String) = Action.async { implicit request =>
    reviewRepository.getByProductId(productId.toLong).map { reviews =>
      Ok(Json.toJson(reviews)).withHeaders(headers._1, headers._2, headers._3)
    }
  }


}

case class CreateReviewForm(productId: String, reviewText: String)
