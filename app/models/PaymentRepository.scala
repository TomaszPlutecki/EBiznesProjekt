package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class PaymentRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class PaymentTable(tag: Tag) extends Table[Payment](tag, "payment") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def status = column[String]("status")

    def * = (id, status) <> ((Payment.apply _).tupled, Payment.unapply)
  }

  private val payment = TableQuery[PaymentTable]

  def create(status: String): Future[Payment] = db.run {
    (payment.map(p => p.status)
      returning payment.map(_.id)
      into ((status, id) => Payment(id, status))
      ) += (status)
  }

  /**
    * List all the payment in the database.
    */
  def list(): Future[Seq[Payment]] = db.run {
    payment.result
  }
}
