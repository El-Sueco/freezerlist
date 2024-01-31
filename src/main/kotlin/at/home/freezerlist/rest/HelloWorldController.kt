package at.home.freezerlist.rest

import at.home.freezerlist.rest.model.HelloWorld
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody

@Controller
class HelloWorldController {

    private val log = LoggerFactory.getLogger(javaClass)

    @GetMapping("/")
    fun getHelloWorld(): ResponseEntity<HelloWorld> {
        log.info("getHelloWorld, getting HelloWorld")
        val helloWorld = HelloWorld()
        helloWorld.hello = "hi"
        helloWorld.world = "jupiter"
        return ResponseEntity.ok(helloWorld)
    }

    @PostMapping("/")
    fun createHelloWorld(@RequestBody helloWorld: HelloWorld): ResponseEntity<HelloWorld> {
        log.info("getHelloWorld, creating HelloWorld with {}", helloWorld)
        helloWorld.hello = helloWorld.hello.plus(" also")
        helloWorld.world = helloWorld.world.plus(" or somewhere else")
        return ResponseEntity.ok(helloWorld)
    }

}