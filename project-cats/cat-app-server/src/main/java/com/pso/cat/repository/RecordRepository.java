package com.pso.cat.repository;

import com.pso.cat.domain.Cat;
import com.pso.cat.domain.Record;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
    List<Record> findAllByCatIdOrderByCreateDateDesc(Long catId);
    Record findFirstByCatIdOrderByCreateDateDesc(Long catId);
}
