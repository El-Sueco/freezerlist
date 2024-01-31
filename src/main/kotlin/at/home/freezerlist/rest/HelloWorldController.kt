package at.home.freezerlist.rest

import at.home.freezerlist.rest.model.HelloWorld
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HelloWorldController {

    private val log = LoggerFactory.getLogger(javaClass)

    @GetMapping("/")
    fun getHelloWorld(): ResponseEntity<HelloWorld> {
        log.info("getHelloWorld, getting HelloWorld")
        var helloWorld = HelloWorld();
        helloWorld.hello = "hi"
        helloWorld.world = "jupiter"
        return ResponseEntity.ok(helloWorld)
    }

}