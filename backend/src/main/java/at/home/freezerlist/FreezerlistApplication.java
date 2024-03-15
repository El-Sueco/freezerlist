package at.home.freezerlist;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class FreezerlistApplication {

    private static final Logger log = LoggerFactory.getLogger(FreezerlistApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(FreezerlistApplication.class, args);
    }

}

