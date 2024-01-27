export default function ListProposal() {
  return (
    <div className="flex w-full items-center justify-center border border-solid ">
      <div className="w-80/100 my-0 ml-0 mr-0  mt-8 flex flex-wrap justify-center  space-x-8 space-y-2 pr-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, index) => (
          <div
            key={index}
            className={`container flex w-96 flex-col items-center justify-center  ${
              index === 0 ? 'm-0 ml-8 mt-0' : ''
            }`}
          >
            <div className="card m-0 mx-0 w-96 border border-solid bg-base-100">
              <figure>
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title w-full text-center">Project-title!</h2>
                <p>Team Member 1</p>
                <p>Team Member 2</p>
                <p> Category </p>

                <div className="card-actions justify-end">
                  <button className="btn btn-primary w-full bg-primary">View More</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
