package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.ExecutionContext

@Singleton
class BasketProductRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class BasketProductTable(tag: Tag) extends Table[BasketProduct](tag, "BasketProduct") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def basket_id = column[Long]("basket_id")

    def product_id = column[Long]("product_id")

    def quantity = column[Int]("quantity")

    def * = (id, basket_id, product_id, quantity) <> ((BasketProduct.apply _).tupled, BasketProduct.unapply)
  }

  private val orderProducts = TableQuery[BasketProductTable]

  def insert(basketId: Long, productId: Long, quantity: Int) = db.run {
    (orderProducts.map(o => (o.basket_id, o.product_id, o.quantity))
      returning orderProducts.map(_.id)
      into { case ((basket_id, product_id, quantity), id) => BasketProduct(id, basket_id, product_id, quantity) }
      ) += ((basketId, productId, quantity))
  }


}
