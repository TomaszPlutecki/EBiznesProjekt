package models

import play.api.libs.json._

case class Types(id: Long, product_id: Long, name: String)

object Types {
  implicit val typeFormat = Json.format[Types]
}
