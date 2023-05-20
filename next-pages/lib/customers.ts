export async function getCustomers() {
  try {
    const { results } = await getDB().prepare('SELECT * FROM Customers').all()
    return results ?? []
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function generateCustomer() {
  try {
    await getDB()
      .prepare(
        "INSERT INTO Customers (CompanyName, ContactName) VALUES ('Test Company', 'Test Contact')"
      )
      .run()
  } catch (error) {
    console.error(error)
  }
}

export type Customer = {
  CustomerID: number
  CompanyName: string
  ContactName: string
}

function getDB() {
  return process.env.DB
}
