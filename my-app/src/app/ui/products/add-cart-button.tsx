'use client'
export default function BuyButton({ id }: { id: string }) {
    function addToCar() {
        alert(`Item ${id} added to the car`)

    }

    return (
        <button
            type="button"
            className="bg-blue-500 w-full font-bold hover:bg-blue-600 text-white px-4 py-2 rounded min-[440px]:mt-10 my-4 cursor-pointer touch-auto"
            onClick={addToCar}
        >
            Add to cart
        </button>
    );
}