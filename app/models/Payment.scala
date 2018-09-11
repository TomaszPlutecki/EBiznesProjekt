package models

import play.api.libs.json._

case class Payment(id: Long, status: String)

object Payment {
  implicit val paymentFormat = Json.format[Payment]
}
