import Image from "next/image";

const Waitlist = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-primary p-4">
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={48}
          height={48}
          priority
        />
        <h2 className="text-blue">Admin Panel</h2>
        <div className="bg-gray">
          <h3 className="text-black border rounded-lg border-gray">
            User Management
          </h3>
        </div>

        <div>
          <label>Postcode</label>
          <input type="text" className="bg-white" placeholder="ZIP" />
        </div>
        <div>
          <h3>Registration Status</h3>

          <div>
            <div>
              <input
                type="radio"
                id="onboarded"
                name="status"
                value="onboarded"
              />
              <label htmlFor="onboarded">Onboarded</label>
            </div>
            <div>
              <input
                type="radio"
                id="rejected"
                name="status"
                value="rejected"
              />
              <label htmlFor="rejected">Rejected</label>
            </div>
          </div>
        </div>
        <div>
          <h3>Date Registered</h3>
          <div>
            <div>
              <label htmlFor="startDate" id="startDate">
                Start
              </label>
              <input type="date" value="startDate" />
              <span>MM/DD/YYYY</span>
            </div>
            <div>
              <label htmlFor="endDate" id="endDate">
                End
              </label>
              <input type="date" value="endDate" />
              <span>MM/DD/YYYY</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Vendor Type</h3>

          <div>
            <input
              type="radio"
              id="independent"
              name="vendor"
              value="independent"
            />
            <label htmlFor="independent">Independent</label>
          </div>
        </div>
        <div>
          <input type="radio" id="company" name="vendor" value="company" />
          <label htmlFor="company">Company</label>
        </div>
        <div>
          <h3>Service Offering</h3>
          <div>
            <input
              type="radio"
              id="housekeeping"
              name="services"
              value="housekeeping"
            />
            <label htmlFor="housekeeping">Housekeeping</label>
          </div>
          <div>
            <input
              type="radio"
              id="windowCleaning"
              name="services"
              value="windowCleaning"
            />
            <label htmlFor="windowCleaning">Window Cleaning</label>
          </div>
          <div>
            <input
              type="radio"
              id="carValet"
              name="services"
              value="carValet"
            />
            <label htmlFor="carValet">Car Valet</label>
          </div>
        </div>
      </aside>

      <main>main</main>
    </div>
  );
};

export default Waitlist;
