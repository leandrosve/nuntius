package com.leandrosve.nuntius.repository;

import com.leandrosve.nuntius.model.Contact;
import com.leandrosve.nuntius.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IContactRepository extends JpaRepository<Contact, Long>{
    
    public Contact findByAlias(String alias);

    public Contact findByOwnerAndUser(User owner, User user);

}