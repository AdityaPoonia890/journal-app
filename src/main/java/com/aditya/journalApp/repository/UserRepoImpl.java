package com.aditya.journalApp.repository;

import com.aditya.journalApp.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.authorization.method.AuthorizeReturnObject;

import java.util.List;

public class UserRepoImpl {

    @Autowired
    MongoTemplate mongoTemplate;

    public List<User> getUsersForSA () {

        Query query = new Query();
        //query.addCriteria(Criteria.where("name").is("ram"));

//        query.addCriteria(Criteria.where("email").exists(true));        //this automatically adds both queries using AND
//        query.addCriteria(Criteria.where("email").ne(null).ne(""));

        query.addCriteria(Criteria.where("email").regex("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,6}$"));
        query.addCriteria(Criteria.where("sentimentAnalysis").is(true));

        /*  If you want to use OR operator , perform this:

        Criteria criteria = new Criteria();
        query.addCriteria(criteria.orOperator(
                                              Criteria.where("email").exists(true),
                                              Criteria.where("sentimentAnalysis").is(true)
                                              );
        * */

        return mongoTemplate.find(query, User.class);
    }
}
