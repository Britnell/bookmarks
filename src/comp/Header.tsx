import * as RadixDialog from "@radix-ui/react-dialog";
import { useAppDispatch } from "../lib/store";
import { deleteAll } from "../lib/bookmark";

export default function Header() {
  return (
    <div className="px-4 py-2 flex items-center">
      <div className="flex-grow">
        <h1 className=" text-3xl font-medium">Mark</h1>
        <h4 className="">All your bookmarks in one place</h4>
      </div>
      <div>
        <Menu />
      </div>
    </div>
  );
}

const Menu = () => {
  const dispatch = useAppDispatch();

  const delete_all = () => dispatch(deleteAll());

  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger className="w-8 h-8 border-2 border-gray-300 rounded-md">
        ?
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay />
        <RadixDialog.Content className="inset-center-x top-4 w-5/6 max-w-2xl bg-gray-300 p-8 rounded-3xl shadow-2xl ">
          <RadixDialog.Title className="text-xl font-semibold mb-4">
            Settings
          </RadixDialog.Title>
          <RadixDialog.Description>
            <div className="text-lg">
              <p>
                This app stores oyur bookmarks in localstorage, if you clear
                your browser they will disappear
              </p>
              <div>
                <h3>Delete</h3>
                <div className="flex gap-4">
                  <label htmlFor="delete">
                    You can delete all your data here
                  </label>
                  <button
                    name="delete"
                    onClick={delete_all}
                    className="bg-red-500 text-white font-semibold px-3 py-1 hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </RadixDialog.Description>
          <RadixDialog.Close className="bg-white text-xl px-3 py-1 font-bold">
            Close
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
