# This program checks if a number entered by the user
# is a palindrome (it reads the same forwards and backwards,
# e.g. 121 or 12321).

num = int(input("Enter a number: "))

original_num = num
reversed_num = 0

# To reverse the number, I use a while loop.
# On each round, I pull off the last digit using % 10,
# add it to reversed_num, then remove that digit using // 10.
temp = num
while temp > 0:
    digit = temp % 10
    reversed_num = reversed_num * 10 + digit
    temp = temp // 10

# Once the loop is done, reversed_num holds the number backwards.
# I compare it to the original number to check for a palindrome.
if original_num == reversed_num:
    print(f"{original_num} is a Palindrome number.")
else:
    print(f"{original_num} is NOT a Palindrome number.")
