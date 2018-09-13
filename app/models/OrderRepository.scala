package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, ExecutionContext, Future}

@Singleton
class OrderRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, paymentRepository: PaymentRepository, orderProductsRepository: BasketProductRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class OrderTable(tag: Tag) extends Table[Order](tag, "order") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def user_id = column[String]("user_id")

    def basket_id = column[Long]("basket_id")

    def payment_id = column[Long]("payment_id")

    def payment_id_fk = foreignKey("payment_id_fk", payment_id, payment)(_.id)

    def * = (id, user_id, basket_id, payment_id) <> ((Order.apply _).tupled, Order.unapply)
  }

  import paymentRepository.PaymentTable
  import orderProductsRepository.BasketProductTable

  private val order = TableQuery[OrderTable]
  private val payment = TableQuery[PaymentTable]

  def create(user_id: String, payment_id: Long, basket_id: Long): Future[Order] = db.run {
    (order.map(o => (o.user_id, o.basket_id, o.payment_id))
      returning order.map(_.id)
      into { case ((user_id, basket_id, payment_id), id) => Order(id, user_id, basket_id, payment_id) }
      ) += ((user_id, basket_id, payment_id))
  }

  /**
    * List all the people in the database.
    */
  def list(): Future[Seq[Order]] = db.run {
    order.result
  }
}
