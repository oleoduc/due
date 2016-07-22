<!-- item template -->
<script type="text/x-template" id="item-template">
    <div id="treeview">
        <li>
            <div class="openList" v-if="isFolder" @click="toggle">[{{open ? '-' : '+'}}]</div>
            <div
                class="section"
                :class="{bold: isFolder}"
                @click="show"
                @dblclick="changeType">
                {{model.name}}
            </div>
            <ul class="listAlts">
                <item
                    class="alt"
                    v-for="model in model.alts"
                    :model="model">
                </item>
            </ul>
            <div
                class="newAlt"
                @click="addAlt">
                {{model.newAlt}}
            </div>
            <ul v-show="open" v-if="isFolder" id="{{model.id+1}}">
                <item
                    class="item"
                    v-for="model in model.children"
                    :model="model">
                </item>
                <li @click="addChild(model)">+</li>
            </ul>
        </li>
    </div>
</script>

<p>(You can double click on an item to turn it into a folder.)</p>

<!-- the demo root element -->
<ul id="demo">
    <item
        class="item"
        :model="treeData">
    </item>
</ul>