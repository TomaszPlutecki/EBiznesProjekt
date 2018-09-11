package models

import play.api.libs.json._

case class Review(id: Long, product_id: Long, review_text: String)

object Review {
  implicit val reviewFormat = Json.format[Review]
}
