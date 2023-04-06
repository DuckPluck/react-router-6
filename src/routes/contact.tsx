import {Form, Params, useLoaderData} from "react-router-dom";
import {getContact, IContact} from "../contacts";
import {FC} from "react";

interface ContactLoaderParams {
    params: {
        contactId: string;
    }
}

export async function loader({ params } : ContactLoaderParams): Promise<{contact: IContact}> {   // TODO: какая-то херня с типом аргумента (any работает)
    const contact = await getContact(params.contactId) as IContact
    return { contact }                                              // async функция для получения данных по параметру contactId (идет в роут)
}                                                                   // `params` - те динамические данные, которые мы указываем в ссылке через `:`

const Contact: FC = () => {
    const { contact }: {contact: IContact} = useLoaderData() as {contact: IContact};

    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || undefined}
                    alt={''}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Contact;

interface FavoriteProps {
    contact: IContact;
}

const Favorite:FC<FavoriteProps> = ({contact}) => {
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    return (
        <Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}