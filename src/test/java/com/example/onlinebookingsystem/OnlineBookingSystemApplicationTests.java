package com.example.onlinebookingsystem;

import com.example.onlinebookingsystem.repository.AccountRepositoryTest;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({AccountRepositoryTest.class})
public class OnlineBookingSystemApplicationTests {
	@Test
	public void contextLoads() {}
}
