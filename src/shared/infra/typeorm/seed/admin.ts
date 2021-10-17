import createConnection from "../index";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, drive_license)
    values('${id}', 'jeje admin', 'jejeadmin@gmail.com', '${password}', true, 'now()', 'XXXXXX')
    `
  );

  await connection.close;
}
create().then(() => console.log("user admin created!"));
