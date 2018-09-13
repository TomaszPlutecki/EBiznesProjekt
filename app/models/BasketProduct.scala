package models

import play.api.libs.json.Json

case class BasketProduct(id: Long, basketId: Long, productId: Long, quantity: Int)

case class BasketProductWithName(id: Long, basketId: Long, productName: String, quantity: Int , price: Int)

object BasketProduct {
  implicit val basketProductFormat = Json.format[BasketProduct]
}

object BasketProductWithName {
  implicit val basketProductFormat = Json.format[BasketProductWithName]
}
