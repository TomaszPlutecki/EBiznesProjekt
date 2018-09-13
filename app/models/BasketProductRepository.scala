package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class BasketProductRepository @Inject()(productRepository: ProductRepository, dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
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

  import productRepository.ProductTable

  private val orderProducts = TableQuery[BasketProductTable]

  private val productTale = TableQuery[ProductTable]


  def insert(basketId: Long, productId: Long, quantity: Int) = db.run {
    (orderProducts.map(o => (o.basket_id, o.product_id, o.quantity))
      returning orderProducts.map(_.id)
      into { case ((basket_id, product_id, quantity), id) => BasketProduct(id, basket_id, product_id, quantity) }
      ) += ((basketId, productId, quantity))
  }

  def update(id: Long, basketId: Long, productId: Long, quantity: Int) = db.run {
    orderProducts.filter(_.id === id).update(BasketProduct(id, basketId, productId, quantity))
  }


  def insertOrUpdate(basketId: Long, productId: Long, quantity: Int) = db.run {
    orderProducts.filter(_.basket_id === basketId).filter(_.product_id === productId).result.map { basketProduct =>
      if (basketProduct.isEmpty)
        insert(basketId, productId, quantity).map(_.id)
      else
        update(basketProduct.head.id, basketId, productId, basketProduct.head.quantity + quantity)
    }
  }.flatten

  def get(basketId: Long): Future[Seq[BasketProductWithName]] = db.run {
    (orderProducts.filter(_.basket_id === basketId) joinLeft productTale on (_.product_id === _.id)).result.map{ joined =>
      joined.map{ a =>
        BasketProductWithName(a._1.id,a._1.basketId,a._2.get.name,a._1.quantity, a._2.get.price)
      }
    }
  }


}
