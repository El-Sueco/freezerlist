package at.home.freezerlist

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.RequestMapping

@SpringBootApplication
class FreezerlistApplication

fun main(args: Array<String>) {
	runApplication<FreezerlistApplication>(*args)
}
