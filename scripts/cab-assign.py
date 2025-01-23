from collections import defaultdict, deque

def main():
    print("###################################### WELCOME TO OUR CAB ASSIGNING PLATFORM ######################################\n")
    print("This platform helps you find or offer seats in a cab at specific times.")
    print("You can either request a seat or notify us about a vacant seat.\n")

    seatmap = defaultdict(deque)
    vacantm = defaultdict(deque)

    while True:
        print("==========================================================")
        print("Choose an option from the menu below:")
        print("1. Add a request for a vacant seat")
        print("2. Add a request for a needed seat")
        print("3. Exit the platform")
        print("==========================================================")
        
        try:
            ch = int(input("Enter your choice (1/2/3): ").strip())
        except ValueError:
            print("Invalid input! Please enter a valid number (1, 2, or 3).\n")
            continue
        
        print()

        if ch == 3:
            print("Thank you for using our platform. Have a great day!")
            break

        # Want a seat
        elif ch == 2:
            print("--- Adding a Request for a Needed Seat ---")
            name = input("Enter your name: ").strip()
            
            try:
                time = int(input("Enter the time (in 24-hour format, e.g., 10 for 10 AM): ").strip())
            except ValueError:
                print("Invalid input for time! Please enter a valid number.\n")
                continue

            try:
                cn = int(input("Enter your contact number: ").strip())
            except ValueError:
                print("Invalid input for contact number! Please enter a valid number.\n")
                continue

            print("\nProcessing your request...\n")

            seatmap[time].append((name, cn))

            if vacantm[time]:
                tname, tnum = vacantm[time].popleft()
                print(f"Congratulations {name}! You have been matched with {tname} (Contact: {tnum}).")
                seatmap[time].popleft()

            # Seat found, group formed
            elif len(seatmap[time]) == 4:
                tempq = seatmap[time]

                # Clearing the queue since it's formed
                seatmap[time] = deque()

                print("Great news! Your group has been successfully formed.")
                print("Here are the group members:")
                print("------------------------------------")

                # Group members info displayed
                for member in tempq:
                    tname, tnum = member
                    print(f"Name: {tname}, Contact: {tnum}")

                print("------------------------------------\n")

            else:
                print(f"Thank you, {name}. Your request has been saved. We will notify you once your group is formed.\n")

        # One seat vacant
        elif ch == 1:
            print("--- Adding a Request for a Vacant Seat ---")
            name = input("Enter your name: ").strip()

            try:
                time = int(input("Enter the time (in 24-hour format, e.g., 10 for 10 AM): ").strip())
            except ValueError:
                print("Invalid input for time! Please enter a valid number.\n")
                continue

            try:
                cn = int(input("Enter your contact number: ").strip())
            except ValueError:
                print("Invalid input for contact number! Please enter a valid number.\n")
                continue

            print("\nProcessing your request...\n")

            if seatmap[time]:
                tempq = seatmap[time]
                first_member = tempq.popleft()

                print(f"Good news, {name}! Your group has found a member:")
                tname, tnum = first_member
                print(f"Name: {tname}, Contact: {tnum}\n")

            else:
                print(f"Thank you, {name}. Your request has been saved. We will notify you as soon as your group is formed.\n")
                vacantm[time].append((name, cn))

        else:
            print("Invalid choice! Please select a valid option (1, 2, or 3).\n")

if __name__ == "__main__":
    main()



