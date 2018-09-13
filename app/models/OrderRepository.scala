package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, ExecutionContext, Future}

@Singleton
class OrderRepository @Inject()(productRepository: ProductRepository, dbConfigProvider: DatabaseConfigProvider, basketProductRepository: BasketProductRepository, orderProductsRepository: BasketProductRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class OrderTable(tag: Tag) extends Table[Order](tag, "order") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def user_id = column[String]("user_id")

    def basket_id = column[Long]("basket_id")

    def payment_id = column[Long]("payment_id")

    def * = (id, user_id, basket_id, payment_id) <> ((Order.apply _).tupled, Order.unapply)
  }

  import productRepository.ProductTable
  import basketProductRepository.BasketProductTable

  private val order = TableQuery[OrderTable]
  private val basketProduct = TableQuery[BasketProductTable]
  private val products = TableQuery[ProductTable]

  def create(user_id: String, payment_id: Long, basket_id: Long): Future[Order] = db.run {
    (order.map(o => (o.user_id, o.basket_id, o.payment_id))
      returning order.map(_.id)
      into { case ((user_id, basket_id, payment_id), id) => Order(id, user_id, basket_id, payment_id) }
      ) += ((user_id, basket_id, payment_id))
  }

  def getOrderForUser(userId: String): Future[Order] = db.run {
    order.filter(_.user_id === userId).result.head
  }

  def getOrderForUserResult(userId: String): Future[OrderResult] = db.run {
    order.filter(_.user_id === userId).result.head.map{ order =>
      basketProductRepository.get(order.basketId).map{ produts =>
        val totalPrice = produts.map(p => p.price * p.quantity).sum
        OrderResult(order.id,order.userId,produts,totalPrice)
      }
    }
  }.flatten

  /**
    * List all the people in the database.
    */
  def list(): Future[Seq[Order]] = db.run {
    order.result
  }
}
