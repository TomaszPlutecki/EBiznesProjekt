package controllers

import javax.inject._
import models._
import play.api.data.Form
import play.api.data.Forms._
import play.api.mvc._
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

class BasketController @Inject()(basketRepository: BasketRepository, basketProductRepository: BasketProductRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val headers = (
    "Access-Control-Allow-Origin" -> "*",
    "Access-Control-Allow-Methods" -> "GET, POST, OPTIONS, DELETE, PUT",
    "Access-Control-Allow-Headers" -> "Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods"
  )

  val basketForm: Form[CreateBasketForm] = Form {
    mapping(
      "userId" -> longNumber,
      "productId" -> longNumber,
      "quantity" -> number
    )(CreateBasketForm.apply)(CreateBasketForm.unapply)
  }

  def addToBasket = Action.async { implicit request =>
    basketForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          Ok(Json.obj("result" -> false)).withHeaders(headers._1,headers._2,headers._3)
        )
      },
      basketRequest => {
        basketRepository.createOrGetBasket(basketRequest.userId).flatMap { basket =>
          basketProductRepository.insertOrUpdate(basket.id, basketRequest.productId, basketRequest.quantity)
        }.map { _ =>
          Ok(Json.obj("result" -> true)).withHeaders(headers._1,headers._2,headers._3)
        }
      }
    )
  }

  def getBasket(userId: String) = Action.async { implicit request =>
    basketRepository.getByUser(userId.toLong).flatMap { basket =>
      basketProductRepository.get(basket.id)
    }.map { products => Ok(Json.toJson(products)).withHeaders(headers._1,headers._2,headers._3) }
  }


}


case class CreateBasketForm(userId: Long, productId: Long, quantity: Int)

