package controllers

import javax.inject.Inject
import models.{BasketRepository, OrderRepository}
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.mvc.{MessagesAbstractController, MessagesControllerComponents}

import scala.concurrent.{ExecutionContext, Future}

class OrderController @Inject()(orderRepository: OrderRepository, basketRepository: BasketRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val headers = (
    "Access-Control-Allow-Origin" -> "*",
    "Access-Control-Allow-Methods" -> "GET, POST, OPTIONS, DELETE, PUT",
    "Access-Control-Allow-Headers" -> "Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods"
  )

  val orderForm: Form[CreateOrderForm] = Form {
    mapping(
      "basketId" -> longNumber,
      "paymentId" -> longNumber
    )(CreateOrderForm.apply)(CreateOrderForm.unapply)
  }

  def addOrder = Action.async { implicit request =>

    orderForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(
          Ok(Json.obj("result" -> false)).withHeaders(headers._1,headers._2,headers._3)
        )
      },
      order =>
        basketRepository.get(order.basketId).flatMap { basket =>
          orderRepository.create(basket.userId, order.paymentId, order.basketId)
        }.map { _ =>
          Ok(Json.obj("result" -> true)).withHeaders(headers._1,headers._2,headers._3)
        }
    )
  }

  def getOrders = Action.async {
    orderRepository.list().map { o =>
      Ok(Json.toJson(o)).withHeaders(headers._1,headers._2,headers._3)
    }
  }

}

case class CreateOrderForm(basketId: Long, paymentId: Long)
