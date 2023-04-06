import {FC} from "react";
import {Form, Link, Outlet, useLoaderData} from "react-router-dom";
import {createContact, getContacts, IContact} from "../contacts";

export async function loader() {                                         // async функция для получения данных (идет в роут)
    const contacts: IContact[] = await getContacts();
    return { contacts };
}

export async function action() {                                             // async функция для нового контакта (идет в роут)
    const contact: IContact = await createContact();
    return { contact }
}

interface Contacts {
    contacts: IContact[];
}

const Root: FC = () => {
    const { contacts } = useLoaderData() as Contacts;         // подтягиваем из роута данные с помощью хука `useLoaderData`
                                                               // это нужно, тк роутер не обновляет страницу, следственно нужно запрашивать данные вручную
    return (                                                   // когда выполняется action (submit), запрос передается в роут и обновляет все `useLoaderData`
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <Form method="post">                      {/* Для отправки введенной информации не на сервер, а в роут, необходимо изменить <form> на <Form> */}
                        <button type="submit">New</button>    {/* и задать в роуте action. Теперь submit будет работать не с html, а с роутером */}
                    </Form>                                   {/* Когда тыкается submit, запрос уходит в роут и обновляет все `useLoaderData` */}

                </div>                                        {/* Для смены отрисовки на текущей странице, а не для перехода на другую (и, следственно, перезагрузки всех данных страницы) */}
                <nav>                                         {/* вместо тега <a> используется <Link> (вместо `href` используется `to`) */}
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <Link to={`contacts/${contact.id}`}>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail">
                <Outlet />                                                              {/* Тут будут рендериться дочерние эл-ты */}
            </div>
        </>
    );
}

export default Root;