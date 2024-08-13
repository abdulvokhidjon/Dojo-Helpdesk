import Link from "next/link";
async function getTickets() {
  // imitate delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(
    "https://json-api.uz/api/project/dojo-tickets/tickets",
    {
      next: {
        revalidate: 10, 
      },
    }
  );
  return res.json();
}
export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <>
      {tickets.data.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
}

// /tickets/id
