package com.leandrosve.nuntius.repository;



import java.util.List;
import java.util.Set;

import com.leandrosve.nuntius.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Long>{
    
    public User findByUsername(String username);
   

    public boolean existsByUsername(String username);
    public boolean existsByEmail(String username);

    @Query( "select u from User u where id in :ids" )
    List<User> findByUserIds(@Param("ids") Set<Long> userIdList);
}