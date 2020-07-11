package com.leandrosve.nuntius.repository;



import com.leandrosve.nuntius.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Long>{
    
    public User findByUsername(String username);
   

    public boolean existsByUsername(String username);
    public boolean existsByEmail(String username);
}