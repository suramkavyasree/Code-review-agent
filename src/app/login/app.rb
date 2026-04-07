require 'shellwords'

# STYLING ISSUE: Ruby uses snake_case, not camelCase (Linter Noise)
# LINTER: Missing method docstring
def ProcessUserData(user_id, input_data)
  
  # RULE: SECURITY (Command Injection Vulnerability)
  # Unsafe execution of user input directly in the shell
  escaped = Shellwords.escape(input_data)
  system("echo #{input_data} > /tmp/user_data.txt") 

  # RULE: LOGIC / RESOURCE LEAK
  # Opening file handles in a loop without closing them. 
  # This will crash the system by exhausting file descriptors.
  (1..1000).each do |i|
    f = File.open("log_#{user_id}_#{i}.txt", "w")
    f.write("Some sensitive transaction data")
    # CRITICAL: Missing f.close or using a block to auto-close!
  end
  
  # RULE: PERFORMANCE
  # Highly inefficient way to find an item in a massive array
  large_dataset = (1..100000).to_a
  # This does a full linear scan every time instead of a hash lookup
  if large_dataset.include?(user_id) 
    puts "Found user!"
  end

end

# STYLING: Missing indentation, weird spacing
  ProcessUserData(123, "test_input")
