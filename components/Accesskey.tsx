import LongButton from "./LongButton";
import { EncryptedData } from "@/app/page";

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

interface AccessKeyProps {
  encryptionData: EncryptedData;
}

const Accesskey = ({ encryptionData }: AccessKeyProps) => {
  return (
    <section
      aria-labelledby="access-key-heading"
      className="bg-card rounded-lg p-3.75 mt-11.25 space-y-5 max-w-175"
    >
      <h2 id="access-key-heading" className="text-[20px] font-semibold">
        Access key
      </h2>
      <pre
        aria-label="Encrypted access key"
        aria-readonly="true"
        tabIndex={0}
        className="whitespace-pre-wrap break-all shadow-sm shadow-primary-600 rounded-lg max-w-171.25 p-3.75 max-sm:text-sm font-mono"
      >
        <code>{encryptionData.accessKey}</code>
      </pre>

      <p className="max-md:text-sm">
        Save this key now — it can&apos;t be recovered once you leave.
      </p>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="copy-status"
      />

      <LongButton
        text="Copy key"
        className="mt-0"
        aria-label="Copy acccess key to clipboard"
        aria-describedby="copy-status"
      />
    </section>
  );
};

export default Accesskey;
