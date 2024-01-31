package at.home.freezerlist.rest

import at.home.freezerlist.rest.model.HelloWorld
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HelloWorldController {

    @GetMapping("/")
    fun getHelloWorld(): ResponseEntity<HelloWorld> {
        var helloWorld = HelloWorld();
        helloWorld.hello = "hi"
        helloWorld.world = "jupiter"
        return ResponseEntity.ok(helloWorld)
    }

}