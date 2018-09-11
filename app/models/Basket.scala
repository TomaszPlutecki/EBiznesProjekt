package models

import play.api.libs.json._

case class Basket(id: Long, userId: Long)

object Basket {
  implicit val orderFormat = Json.format[Basket]
}
