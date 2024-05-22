
CREATE TABLE Client
(
	client_id            DEC(6)  NOT NULL ,
	first_name           VARCHAR2(50)  NULL ,
	address              VARCHAR2(80)  NULL ,
	phone_number         VARCHAR2(12)  NULL ,
	email                VARCHAR2(50)  NULL ,
	last_name            VARCHAR2(50)  NULL 
);

ALTER TABLE Client
	ADD CONSTRAINT  XPKClient PRIMARY KEY (client_id);

CREATE TABLE Librarian
(
	librarian_id         DEC(6)  NOT NULL ,
	first_name           VARCHAR2(20)  NULL ,
	last_name            VARCHAR2(20)  NULL ,
	email                VARCHAR2(50)  NULL ,
	address              VARCHAR2(80)  NULL ,
	phone_number         VARCHAR2(14)  NULL ,
	role                 VARCHAR2(40)  NULL 
);

ALTER TABLE Librarian
	ADD CONSTRAINT  XPKLibrarian PRIMARY KEY (librarian_id);

CREATE TABLE Book
(
	book_id              DEC(38)  NOT NULL ,
	name                 VARCHAR2(50)  NULL ,
	author               VARCHAR2(50)  NULL ,
	description          VARCHAR2(200)  NULL ,
	edition              VARCHAR2(50)  NULL ,
	editor               VARCHAR2(40)  NULL 
);

ALTER TABLE Book
	ADD CONSTRAINT  XPKBook PRIMARY KEY (book_id);

CREATE TABLE Stock
(
	stock_id             DEC(6)  NOT NULL ,
	status               VARCHAR2(20)  NULL ,
	book_id              DEC(38)  NULL ,
	available            INT  NULL ,

CONSTRAINT R_1 FOREIGN KEY (book_id) REFERENCES Book (book_id)
);

ALTER TABLE Stock
	ADD CONSTRAINT  XPKStock PRIMARY KEY (stock_id);

CREATE TABLE Loan
(
	loan_id              DEC(6)  NOT NULL ,
	client_id            DEC(6)  NULL ,
	librarian_id         DEC(6)  NULL ,
	stock_id             DEC(6)  NULL ,
	loan_start_date      NCLOB  NULL ,
	loan_due_date        NCLOB  NULL ,
	loan_return_date     NCLOB  NULL ,
	status               VARCHAR2(20)  NULL ,

CONSTRAINT R_2 FOREIGN KEY (client_id) REFERENCES Client (client_id),

CONSTRAINT R_3 FOREIGN KEY (librarian_id) REFERENCES Librarian (librarian_id),

CONSTRAINT R_4 FOREIGN KEY (stock_id) REFERENCES Stock (stock_id)
);

ALTER TABLE Loan
	ADD CONSTRAINT  XPKLoan PRIMARY KEY (loan_id);

CREATE TABLE Fine
(
	fine_id              DEC(8)  NOT NULL ,
	amount_to_pay        FLOAT  NULL ,
	fine_date            NCLOB  NULL ,
	status               VARCHAR2(20)  NULL ,
	loan_id              DEC(6)  NULL ,

CONSTRAINT R_5 FOREIGN KEY (loan_id) REFERENCES Loan (loan_id)
);

ALTER TABLE Fine
	ADD CONSTRAINT  XPKFine PRIMARY KEY (fine_id);
