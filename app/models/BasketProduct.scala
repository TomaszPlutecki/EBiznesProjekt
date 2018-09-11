package models

import play.api.libs.json.Json

case class BasketProduct(id: Long, basketId: Long, productId: Long, quantity: Int)

object BasketProduct {
  implicit val basketProductFormat = Json.format[BasketProduct]
}
