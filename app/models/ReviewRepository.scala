package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.{Future, ExecutionContext}

@Singleton
class ReviewRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, productRepository: ProductRepository)(implicit ec: ExecutionContext) {
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class ReviewTable(tag: Tag) extends Table[Review](tag, "review") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def product_id = column[Long]("product_id")

    def product_id_fk = foreignKey("product_id_fk", product_id, product)(_.id)

    def review_text = column[String]("review_text")

    def * = (id, product_id, review_text) <> ((Review.apply _).tupled, Review.unapply)
  }

  import productRepository.ProductTable

  private val review = TableQuery[ReviewTable]
  private val product = TableQuery[ProductTable]

  def create(product_id: Long, review_text: String): Future[Review] = db.run {
    (review.map(r => (r.product_id, r.review_text))
      returning review.map(_.id)
      into { case ((product_id, review_text), id) => Review(id, product_id, review_text) }
      ) += ((product_id, review_text))
  }

  /**
    * List all the reviews in the database.
    */
  def list(): Future[Seq[Review]] = db.run {
    review.result
  }

  def getByProductId(productId: Long): Future[Seq[Review]] = {
    db.run {
      review.filter(_.product_id === productId).result
    }
  }
}
