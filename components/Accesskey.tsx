import LongButton from "./LongButton";

const dummyKey = `-----BEGIN AGE ENCRYPTED FILE-----
YWdlLWVuY3J5cHRpb24ub3JnL3YxCi0+IHRsb2NrIDI2NDA3NjQzIDUyZGI5YmE3
MGUwY2MwZjZlYWY3ODAzZGQwNzQ0N2ExZjU0Nzc3MzVmZDNmNjYxNzkyYmE5NDYw
MGM4NGU5NzEKZ2NNWFdpeFBuQkx0OGE3emlkbXo2TlU5UnMzQXYzWDZrTWhSaW5n
ZWUzT0FEZEd6M2dadE9Sbkx6cEdhTzB3MwpHQjY5a3hKcCtya3gvTnBna3RFZnN2
RGMwYk53QXN6RXcrNUNZVXB1QWNoZ084Rnd6QWxTK1YvMHFVWTNoUFJuCnQ5R3pC
WHlUNE9zRk1uN2YrQ1BjbG51TENCWFlNNEZLaEw2RHZyN052MnMKLT4gKXMtZ3Jl
YXNlICpQJHkKamYzeWk4SUV6Ukt1OUdiUmhBenBoWDBpR1llcWZHcUJmRlZ4c01V
eWt0VlhWSitxU3Z2TTlQVG9QZjNWcmNBLwpONzFwSk0zVThnWmp0dTdYTEVCdXRB
SlN5b1AzengxTHdERnY0bk1EVGlEaE40b1NrNW1CREVqSkpTVQotLS0gTUZ3bTYw
aDhHZDRnRGdHdXU0dFloMG9lUlRLaEVVOXJjdVFDQkR3SUs4ZwquQcU4B0pMyL/o
cZLo4a76Pdv4HNcjYJTaLkTa2beSZeCZflKVQwbUFmW2iauAy0Y=
-----END AGE ENCRYPTED FILE-----`;

const Accesskey = () => {
  return (
    <div className="border bg-card rounded-lg p-[15px] mt-[45px] space-y-5">
      <p className="text-[20px] font-semibold">Access key</p>
      <p className="whitespace-pre-wrap break-all shadow-card rounded-lg max-w-[685px]">
        {dummyKey}
      </p>

      <p>Save this key now — it can&apos;t be recovered once you leave.</p>
      <LongButton text="Copy key" className="mt-0" />
    </div>
  );
};

export default Accesskey;
