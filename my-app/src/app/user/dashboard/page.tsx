"use client";

const Page = () => {
  return (
    <div className="bg-gray-200 text-black p-4 sm:p-10 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10">
        <section className="mb-10 text-justify">
          <h1 className="text-3xl font-bold border-b-2 border-amber-400 pb-2">
            Welcome User
          </h1>

          <p className="mt-4 text-gray-700">
            Manage your account from here.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/seller/edit-profile"
            className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
            <p className="text-sm text-gray-600">
              Update your personal information.
            </p>
          </a>
        </section>
      </div>
    </div>
  );
};

export default Page;