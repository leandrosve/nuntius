package com.leandrosve.nuntius.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
	@EnableWebMvc
	public class WebConfiguration implements WebMvcConfigurer {
	 
	    @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**").allowedOrigins("*");
		}
		
		public void addResourceHandlers(ResourceHandlerRegistry registry) {
			registry
			  .addResourceHandler("/resources/**")
			  .addResourceLocations("/resources/","/other-resources/")
			  .setCachePeriod(3600*24)
			  .resourceChain(true)
			  .addResolver(new PathResourceResolver());
		}
	}