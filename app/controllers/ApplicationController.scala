package controllers

import javax.inject.Inject
import com.mohiva.play.silhouette.api.actions.SecuredRequest
import com.mohiva.play.silhouette.api.{LogoutEvent, Silhouette}
import org.webjars.play.WebJarsUtil
import play.api.i18n.I18nSupport
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, AnyContent, ControllerComponents}
import utils.auth.DefaultEnv

import scala.concurrent.Future

/**
  * The basic application controller.
  *
  * @param components  The Play controller components.
  * @param silhouette  The Silhouette stack.
  * @param webJarsUtil The webjar util.
  * @param assets      The Play assets finder.
  */
class ApplicationController @Inject()(
                                       components: ControllerComponents,
                                       silhouette: Silhouette[DefaultEnv]
                                     )(
                                       implicit
                                       webJarsUtil: WebJarsUtil,
                                       assets: AssetsFinder
                                     ) extends AbstractController(components) with I18nSupport {

  val headers = (
    "Access-Control-Allow-Origin" -> "*",
    "Access-Control-Allow-Methods" -> "GET, POST, OPTIONS, DELETE, PUT",
    "Access-Control-Allow-Headers" -> "Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods"
  )

  /**
    * Handles the index action.
    *
    * @return The result to display.
    */
  def index = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    Future.successful(Redirect("http://localhost:3000/"))
  }

  /**
    * Handles the Sign Out action.
    *
    * @return The result to display.
    */
  def signOut = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    val result = Redirect("http://localhost:3000/")
    silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
    silhouette.env.authenticatorService.discard(request.authenticator, result)
  }


  def getUser = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>

    val userId = request.identity.userID
    val fullName = request.identity.fullName
    val email = request.identity.email

    Future.successful(Ok(Json.obj("userId" -> userId, "fullName" -> fullName, "email" -> email, "log" -> true)).withHeaders(headers._1,headers._2,headers._3))
  }
}
