package com.leandrosve.nuntius;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NuntiusAPI implements CommandLineRunner {

	private static Logger LOG = LoggerFactory.getLogger(NuntiusAPI.class);
	public static void main(String[] args) {
		SpringApplication.run(NuntiusAPI.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		LOG.info("hello world");
	}

}
