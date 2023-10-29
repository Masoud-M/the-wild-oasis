import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

// giving the income cabinToEdit prop the default value of an object because sometimes it does'nt have any values in it.
function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;

  // to specify if we are adding a new cabin or we are editing a cabin, we make a boolean value based on the existence of editId and use it to determine the session
  const isEditSession = Boolean(editId);

  // if we are editing a cabin, the editing values coming from prop will be the default values of the input form and otherwise they'll be empty
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // formState is an object that we destruct to get the errors so we can show them to the user
  const { errors } = formState;

  const queryClient = useQueryClient();

  // useMutation hook gives us access to the mutate function which allows us to mutate the data with the specified mutationFn, in this case the createCabin function that we created. and if it is successful, then using useQueryClient we can get access to the queryClient and invalidate the query with the key of cabins in order to reload the page. and then using the reset function coming from react hook form, resetting the form.
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // we can only pass ONE argument to the mutationFn, so that's why we are using destructuring to pass TWO argument to the function
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    // onError: (err) => toast.error(err.message),
    onError: (err) => console.log(err),
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // if the user upload a new picture, the type of image would be a string, otherwise it would be an object
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin({ newCabinData: { ...data, image }, id: editId });
    // to add the image file we spread the data and then we need to grab the image file from data, which is the first element in the image object
    else createCabin({ ...data, image: image });
  }

  function onError(errors) {
    // console.log(errors);
  }
  return (
    // when this form gets submitted, if all the inputs pass all the validation checks, our onSubmit function will be called and the input data will be passed to it, otherwise if there is an error, our onError function will be called and the error will be passed to it
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            // validate lets us to write our custom validation, and the input value will be passed to it as the argument, as soon as the logic we wrote gets true, the field gets correctly validated. otherwise in this case it will return the message.
            // using getValues function provided with react hook form we get access to all the input values of this form and we can write our logic
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...register("image", {
            // when editing a cabin, we don't need the picture to be a requirement and keep it as it is
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! that resets the form */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
