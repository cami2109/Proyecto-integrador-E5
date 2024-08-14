package com.melodymix.controlador;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/testeo")
public class TestControlador {
    @GetMapping("/hello")
    public String hello() {
        return "Hello!!";
    }

}
