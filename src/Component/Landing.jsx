import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Landing() {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [bookTitle, setBookTitle] = useState("sample");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://openlibrary.org/search.json?title=${bookTitle}`)
            .then((res) => {
                setData(res.data.docs)
                console.log(res.data.docs)
                setLoading(false)
                setError(false)
            })
            .catch((err) => {
                setError("Error in fetching data: " + err.message)
                setLoading(false)
            })
    }, [bookTitle])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() == "") return
        setBookTitle(query)
        setQuery("")
        setLoading(true)
    }

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">

                <div className="flex justify-center m-4">
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center bg-white shadow-md  overflow-hidden w-full max-w-md"
                    >
                        <input
                            type="text"
                            placeholder="Search books..."
                            value={query}
                            onChange={(e) => setQuery((e.target.value))}
                            className="w-full px-4 py-3 text-gray-700 focus:outline-blue-700"
                        />
                        <button
                            type="submit"
                            className="px-4 py-3 bg-blue-600 text-white  font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-10 text-gray-600 text-xl font-medium">
                        Loading please wait...
                    </div>
                ) : error ? (
                    /* Error State */
                    <div className="flex justify-center items-center py-10 text-red-600 text-xl font-medium">
                        {error}
                    </div>
                ) : data?.length === 0 ? (
                    /* Empty State */
                    <div className="flex justify-center items-center py-10 text-gray-600 text-xl font-medium">
                        Sorry, we couldn’t find any results for your search.
                    </div>
                ) : (
                    <div>
                        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-10">
                            {data.map((book) => (
                                <li
                                    key={book.key}
                                    className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
                                >
                                    {/* Title */}
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                        {book.title}
                                    </h2>

                                    {/* Author */}
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Author:</span>{" "}
                                        {book.author_name?.join(", ") || "Unknown"}
                                    </p>

                                    {/* Publish Year */}
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">First Published:</span>{" "}
                                        {book.first_publish_year || "N/A"}
                                    </p>

                                    {/* Edition Count */}
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Editions:</span>{" "}
                                        {book.edition_count}
                                    </p>

                                    {/* Ebook Access */}
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Ebook:</span>{" "}
                                        {book.ebook_access === "no_ebook" ? "Not Available" : "Available"}
                                    </p>
                                    {/* Language */}
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Language:</span>{" "}
                                        {book.language
                                            ? book.language
                                                .join(", ")
                                                .replace(/^./, (c) => c.toUpperCase())
                                            : "Unknown"}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div >

        </>
    )
}

export default Landing