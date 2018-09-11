package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class BasketRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, productRepository: ProductRepository)(implicit ec: ExecutionContext) {
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class BasketTable(tag: Tag) extends Table[Basket](tag, "basket") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def user_id = column[Long]("user_id")

    def * = (id, user_id) <> ((Basket.apply _).tupled, Basket.unapply)
  }

  import productRepository.ProductTable

  private val basket = TableQuery[BasketTable]
  private val product = TableQuery[ProductTable]

  def create(user_id: Long): Future[Basket] = db.run {
    (basket.map(b => (b.user_id))
      returning basket.map(_.id)
      into { case ((user_id), id) => Basket(id, user_id) }
      ) += (user_id)
  }

  /**
    * List all the people in the database.
    */
  def list(): Future[Seq[Basket]] = db.run {
    basket.result
  }

  def remove(id: Long): Future[Int] = db.run {
    basket.filter(_.id === id).delete
  }
}
