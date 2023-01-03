import { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from '../context/usercontext';
import Link from 'next/link';

function NavComponent() {
  const user = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Casino</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', gap: "5px"}}
            navbarScroll
          >
            <Link href="/">
              Home
            </Link>

            <Link href="/boxes">
              Boxes
            </Link>

            <Link href="/battles">
              Battles
            </Link>

            <Link href="/inventory">
              Inventory
            </Link>

            <Link href="/account">
              Account
            </Link>

            <div style={{marginLeft: "50px"}}/>

            <Link href="/admin/items">
              <div style={{color: "red", cursor: "pointer"}}>Admin - Item Database</div>
            </Link>
            <Link href="/admin/boxes">
              <div style={{color: "red", cursor: "pointer"}}>Admin - Boxes</div>
            </Link>
          </Nav>
          
          {!user &&
            <a href="http://localhost:7777/auth/steam">
              <div className="d-flex">
                <Button variant="outline-success">Login With Steam</Button>
              </div>
            </a>
          }

          {user &&
            <div style={{display: "flex", gap: "5px", alignItems: "center"}}>
              <img src={user.avatar}/>
              <div>{user.displayName}</div>

              <div style={{display: "flex", backgroundColor: "darkGreen", color: "white", fontWeight: "bold", padding: "0px 15px 1px 15px", borderRadius: "5px"}}>
                {user.balance/100}
              </div>
            </div>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;