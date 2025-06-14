package examen2.backend.data;

import examen2.backend.logic.Opcion;
import examen2.backend.logic.Pregunta;
import examen2.backend.logic.User;
import examen2.backend.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
@Component
public class DataLoader {

    @Autowired
    public DataLoader(UserRepository userRepository, PreguntaRepository preguntaRepository) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        userRepository.save(new User("JPerez", bCryptPasswordEncoder.encode("1"), "CLI", "Juan Perez"));
        userRepository.save(new User("MMata", bCryptPasswordEncoder.encode("1"), "CLI", "Maria Mata"));

        Pregunta p; Opcion op1, op2, op3, op4;

        p = new Pregunta("What is java?", "Prog. Languages");
        op1 = new Opcion("A programming language");
        op2 = new Opcion("A scripting language");
        op3 = new Opcion("A animation language");
        p.setOpciones(Arrays.asList(op1, op2, op3));
        p.setCorrectas(Arrays.asList(op1));
        preguntaRepository.save(p);

        p = new Pregunta("A sql keyword", "Data Bases");
        op1 = new Opcion("Insert");
        op2 = new Opcion("New");
        op3 = new Opcion("Update");
        p.setOpciones(Arrays.asList(op1, op2, op3));
        p.setCorrectas(Arrays.asList(op1, op3));
        preguntaRepository.save(p);

        p = new Pregunta("Not Object Oriented?", "Prog. Languages");
        op1 = new Opcion("C++");
        op2 = new Opcion("C");
        op3 = new Opcion("Java");
        op4 = new Opcion("C#");
        p.setOpciones(Arrays.asList(op1, op2, op3, op4));
        p.setCorrectas(Arrays.asList(op2));
        preguntaRepository.save(p);

        p = new Pregunta("Is HTML a programming language?", "Prog. Languages");
        op1 = new Opcion("Yes");
        op2 = new Opcion("No");
        p.setOpciones(Arrays.asList(op1, op2));
        p.setCorrectas(Arrays.asList(op2));
        preguntaRepository.save(p);

        p = new Pregunta("An example of a database server?", "Data Bases");
        op1 = new Opcion("Android");
        op2 = new Opcion("MySql");
        op3 = new Opcion("Linux");
        p.setOpciones(Arrays.asList(op1, op2, op3));
        p.setCorrectas(Arrays.asList(op2));
        preguntaRepository.save(p);
    }
}
