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
          Ok(Json.obj("result" -> false))
        )
      },
      order =>
        basketRepository.get(order.basketId).flatMap { basket =>
          orderRepository.create(basket.userId, order.paymentId, order.basketId)
        }.map { _ =>
          Ok(Json.obj("result" -> true))
        }
    )
  }

  def getOrders = Action.async {
    orderRepository.list().map { o =>
      Ok(Json.toJson(o))
    }
  }

}

case class CreateOrderForm(basketId: Long, paymentId: Long)
